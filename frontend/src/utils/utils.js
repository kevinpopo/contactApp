export function getContextPath () {
  var pathName = document.location.pathname;
  var index = pathName.substr(1).indexOf("/");
  var contentPath = pathName.substr(0, index + 1);
  return contentPath;
}

export function getAge(birthdayStr) {
  var birthday= birthdayStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if(birthday==null) return false;
  var date = new Date(birthday[1], birthday[3]-1, birthday[4]);
  if (date.getFullYear() == birthday[1] && (date.getMonth()+1) == birthday[3] && date.getDate()==birthday[4] ) {
    var year = new Date().getFullYear();
    return year-birthday[1];
  }
}
