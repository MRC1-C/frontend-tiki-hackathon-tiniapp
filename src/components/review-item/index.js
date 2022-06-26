Component({
  data: {
    imgs: "https://photo-cms-baophapluat.zadn.vn/460x575/Uploaded/2022/gznrxgmabianhgzmath/2021_07_16/blackpink-rose3-3188.jpeg",
    username: "",
    email: '',
    outfits: [],
    show: false
  },
	props: {
    id: "62b3bd405cdb696246acdbe4",
    numOfComments: 0,
    numOfLikes: 3,
    numOfReviewedOutfit: 4,
    outfitIdList: [
      {
        "$oid": "62b3bd565cdb696246acdd69"
      },
      {
        "$oid": "62b3bd565cdb696246acdd69"
      },
      {
        "$oid": "62b3bd565cdb696246acdd69"
      },
      {
        "$oid": "62b3bdaf5cdb696246ace39c"
      }
    ]
  },
  didMount(){
      my.request({
        url: `https://127.0.0.1:5000/get-user-by-id?userId=${this.props.id}`,
        method: 'GET',
        success: (response) => {
          this.setData({username: response.data.username,email: response.data.email})
          if(response.data.username.length %2==0){
            this.setData({imgs: 'https://image.thanhnien.vn/1200x630/Uploaded/2022/zxaijr/2021_03_16/rosealbumkyluc1_lgic.png'})
          }
        }
      });
      this.props.outfitIdList.forEach(element => {
        my.request({
          url: `https://127.0.0.1:5000/get-outfit?outfit_id=${element['$oid']}`,
          method: 'GET',
          success: (response) => {
            this.setData({outfits: [...this.data.outfits,response.data]})
          }
        });
      });
  },
  methods: {
    onContact(){
      this.setData({ show: true });
    },
    handleHideModal() {
      this.setData({ show: false });
    },
    onSubmit(e){
      let bind = this
      my.getStorage({
        key: 'access_token',
        success: function (res) {
      my.request({
        url: 'https://127.0.0.1:5000/contact-reviewer',
        method: 'POST',
        headers: {
          "Authorization": 'Bearer ' + res.data
        },
        data: {
          reviewerEmail: bind.data.email,
          content: e.detail.value.content
        },
        success: (response) => {
          bind.setData({show: false})
        }
      });
        },
        fail: function (res) {
          my.alert({ content: res.errorMessage });
        }
      });
    }
  }
});