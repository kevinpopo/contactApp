<template lang="html">
<div class="container">
    <!-- toolbar for search -->
    <div class="toolbar">
      <el-input placeholder="Search by name..." class="search" v-model = "filterKey" @keyup.enter.native="filterByKey">
        <el-button slot="append" icon="el-icon-search" @click="filterByKey"></el-button>
      </el-input>
    </div>

    <!-- contactList -->
    <div class="contact-table">
      <el-table :data="contacts" @sort-change="sortChange" style="width: 100%">
        <el-table-column prop="UserID" label="UserID" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="Title" label="Title" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="Name" label="Name" sortable="custom" width="260"></el-table-column>
        <el-table-column prop="BirthDate" label="Age" align="center" :formatter="formatter" sortable="custom" width="120"></el-table-column>
        <el-table-column prop="IsFavorite" label="Favorite" align="center" sortable="custom" width="120">
          <template slot-scope="scope" >
            <i class="el-icon-star-on" v-if="scope.row.IsFavorite === 1"></i>
            <i class="el-icon-star-off" v-if="scope.row.IsFavorite === 0"></i>
          </template>
        </el-table-column>
        <el-table-column prop="ContactCount" label="ContactCount" align="center" width="160"></el-table-column>
        <el-table-column label="DetailInfo" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="showDetail(scope.$index, scope.row)">ShowDetail</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- pagination for contactList -->
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes= "pageSize"
        :page-size= "pageLimit"
        layout= "total, sizes, prev, pager, next"
        :total="totalPages">
    </el-pagination>
    </div>

    <!-- dialog for detailInfo -->
    <el-dialog
      title="DetailInfo"
      :visible.sync="visible"
      width="100%"
      fullscreen="true"
      :modal="false"
      center>
      <el-table :data="contactDetailData" style="width: 100%">
        <el-table-column prop="UserID" label="UserID" width="150"></el-table-column>
        <el-table-column prop="ContactDetailType" label="ContactDetailType" width="200"></el-table-column>
        <el-table-column prop="ContactDetailContent" label="ContactDetailContent"></el-table-column>
      </el-table>
    </el-dialog>
</div>
</template>

<script>
import {getAge} from '../utils/utils'  // Use the function in utils.js to calculate the user's age
export default {
  name: 'app',
  data() {
    return {
      currentPage: 1,
      pageLimit: 5,
      sortKey: 'UserID',
      sortOrder: 'ascending',
      filterKey: '',
      pageSize: [5, 10],
      visible: false
    }
  },
  computed: {
    contacts () {
      return this.$store.getters.contactListData.contacts;
    },
    totalPages () {
      return this.$store.getters.contactListData.totalPages;
    },
    contactDetailData () {
      return this.$store.getters.contactDetailData;
    },
    // httpRequest params
    params () {
      return {
        'page':this.currentPage,
        'limit': this.pageLimit,
        'sort': this.sortKey,
        'filter': this.filterKey,
        'order':this.sortOrder
      }
    }
  },
  methods: {
  // format the birthday
  formatter(row, column) {
    let birthday = row.BirthDate.substr(0,10);
    return getAge(birthday);
  },
  // format the birthday
  sortChange (val) {
    if (val.prop !== null) {
      this.sortKey = val.prop;
      this.sortOrder = val.order;
    } else {
      this.sortKey = 'UserID';
      this.sortOrder = 'ascending';
    }
    this.$store.dispatch("GET_CONTACT_LIST", this.params);
  },
  // Send request to get filtered data
  filterByKey () {
    this.$store.dispatch("GET_CONTACT_LIST", this.params);
  },
  // Send request to get detail information by UserID
  showDetail (index, row){
    this.$store.dispatch("GET_CONTACT_DETAIL", row.UserID);
    this.visible = true;
  },
  // Send request to get data of selected pagesize
  handleSizeChange(pageSize) {
    this.pageLimit = pageSize;
    this.$store.dispatch("GET_CONTACT_LIST", this.params);
  },
  // Send request to get data of selected page
  handleCurrentChange (pageNum) {
    this.currentPage = pageNum;
    this.$store.dispatch("GET_CONTACT_LIST", this.params);
  }
}
}
</script>

<style lang="scss" scoped>
.container{
  padding: 0px 15px;
  position: absolute;
  top:50%;
  left:50%;
  width:55%;
  min-width: 1100px;
  transform:translate(-50%,-50%);
  background-color: #fff;
}

.toolbar{
  height: 44px;
  text-align: right;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
  .search{
    margin: 2px 10px 2px 0;
    width: 300px;
  }
}

.pagination{
  text-align: right;
  margin: 2px 10px 2px 0;
}
</style>
