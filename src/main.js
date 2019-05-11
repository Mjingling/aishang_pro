

if (IS_PRODUCTION){
  //生产环境配置
  API_URL = "https://doctor.5aszy.com";
  PATAINT_API_URL = "https://patient.5aszy.com";
}else{
  //开发环境配置
  API_URL = "/doctorapi";
  PATAINT_API_URL = "/patientapi";
}
var API_URL = PATAINT_API_URL = "../mock";

new Vue({
  el: "#app",
  data: {
    token: "",
    queryString: null,
    isShowPerImg: false,
    isLoadingPage: false,
    perImgUrl: "",
    docInfo:{},
    caseInfo: {
      "patientInfo": "...",
      "appeal": "...",
      "shareContent": "...",
      "prescription": "...",
      "casePics": [],
      "title": "",
      "headImag": "",
      "doctorName": "...",
      "titles": "...",
      "departName": "..."
    },
    detailList: [],
    caseComments: [
      {
        "id": "https://pic.5aszy.com/group1/M00/00/2F/rBImA1x_gsyAF2eAAAGAVpF4LjE608.jpg",
        "headImage": "https://pic.5aszy.com/group1/M00/00/2F/rBImA1x_gsyAF2eAAAGAVpF4LjE608.jpg",
        "name": "斩三",
        "time": "2019年4月20日",
        "content": "内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科",
      },
      {
        "headImag": "https://pic.5aszy.com/group1/M00/00/2F/rBImA1x_gsyAF2eAAAGAVpF4LjE608.jpg",
        "doctorName": "斩三",
        "time": "2019年4月20日",
        "titles": "主任医师",
        "departName": "内分泌科",
        content: "内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科内分泌科",
      }
    ],
  },
  created() {
    this.queryString = this.getQueryString();
    this.docId = this.queryString.docId;
    this.caseId = this.queryString.caseId;
    this.token = this.queryString.token||"";
    this.isLoadingPage = true;
    this.getDocInfo();
    this.getCaseInfo();
    this.getCaseComments();
  },
  methods: {
    showPreviewImg: function (url) {
      this.perImgUrl = url;
      this.isShowPerImg = true;
    },
    closePreviewImg: function () {
      this.isShowPerImg = false;
    },
    getDocInfo: function () {
      var _this = this;
      $.get(PATAINT_API_URL + "/api/open/doctor/invitation_info.json", { doctorId: this.docId }, function (res) {
        _this.isLoadingPage = false;
        if (res.code == 200) {
          _this.docInfo = res.data;
        }
      },"json");
    },
    getCaseInfo: function () {
      var _this = this;
      var url = "/api/case/";
      $.ajax({
        url:API_URL + url + this.caseId +".json",
        method:"get",
        dataType:"json",
        headers:{
          token: _this.token
        },
        success:function (res) {
          _this.isLoadingPage = false;
          if(res.code == 200){
            _this.caseInfo = res.data;
          }else if(res.code == 403){
            toast.tip(res.message);
          }else{
            toast.tip(res.message);
          }
        }
      });
    },
    getCaseComments: function () {
      var _this = this;
      var url = "/api/res/comment/get_comment_list.json";
      $.ajax({
        url: API_URL + url + "?business=" + this.caseId,
        method:"get",
        dataType:"json",
        headers:{
          token: _this.token
        },
        success:function (res) {
          if(res.code == 200){
            _this.caseComments = res.data;
          }else if(res.code == 403){
            toast.tip(res.message);
          }else{
            toast.tip(res.message);
          }
        }
      });
    },
    getQueryString: function () {
      var search = location.search.substring(1);
      if (search == "") return {};
      var queryStringArr = search.split("&");
      var queryString = {};
      for (var i in queryStringArr) {
        var prop = queryStringArr[i].split("=")[0];
        var val = queryStringArr[i].split("=")[1];
        queryString[prop] = val;
      }
      return queryString;
    }
  }
});
