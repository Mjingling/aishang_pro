var API_URL = PATAINT_API_URL = "";
// var API_URL = PATAINT_API_URL = "../mock";

if (IS_PRODUCTION){
  //生产环境配置
  API_URL = "https://doctor.5aszy.com";
  PATAINT_API_URL = "https://patient.5aszy.com";
}else{
  //开发环境配置
  API_URL = "/doctorapi";
  PATAINT_API_URL = "/patientapi";
}

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
    textAreaFocus: false,
    sentCont: "",
    detailList: [],
    caseComments: [],
    loadingComment: false,
    commentEnd: false,
    pageIndex: 1,
    pageSize: 10,
    pageCount: 1,
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
  computed: {
    isChecked() {
      let is = false;
      if (this.sentCont != "") {
        is = true;
      }
      return is;
    },
  },
  methods: {
    fixHeight(){
      this.textAreaFocus = !this.textAreaFocus;
    },
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
        type:"get",
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
      if (this.loadingComment) return;
      if (this.commentEnd) return;
      if(this.pageIndex > this.pageCount) return;
      var _this = this;
      var url = "/api/comments/get_comment.json";
      var params = {
        caseId: this.caseId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };
      $.ajax({
        url: API_URL + url,
        data: params,
        type:"get",
        dataType:"json",
        headers:{
          token: _this.token
        },
        success:function (res) {
          if(res.code == 200 && res.data){
            _this.caseComments = _this.caseComments.concat(res.data);
            _this.pageCount = res.page.pageCount;
            _this.pageIndex +=1;
            if(_this.pageIndex>_this.pageCount){
              _this.commentEnd = true;
            }
          }else{
            toast.tip("加载失败，请稍候重试~");
          }
        }
      });
    },
    sentMessage(){
      var _this = this;
      var url = "/api/comments/publish_comments.json";
      $.ajax({
        url: API_URL + url,
        type: "post",
        dataType: "json",
        data:{
          businessId:this.caseId,
          content: this.sentCont,
        },
        headers: {
          token: _this.token
        },
        success: function (res) {
          if (res.code == 200) {
            _this.caseComments.unshift({
              "commentId": "",
              "businessId": _this.caseId,
              "content": _this.sentCont,
              "realName": "游客",
              "headPhoto": "https://pic.5aszy.com/static/image/youke.png",
              "titles": null,
              "createTime": "刚刚",
              "count": 0,
              "owner": false,
              "comment": null
            });
            _this.fixHeight();
            _this.sentCont = "";
            toast.tip("评论已发布~");
          } else {
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
