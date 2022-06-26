Page({
  data: {
    id: "",
    text: "",
    items: []
  },
  onInput(e) {
    console.log('onInput', e);
    this.setData({text: e.detail.value})
  },
  onPost(){
    let bind = this
    my.getStorage({
      key: 'access_token',
      success: function (res) {
        console.log(res.data)
        my.request({
          url: 'https://127.0.0.1:5000/review-outfit',
          method: 'POST',
          headers: {
            "Authorization": "Bearer "+ res.data
          },
          data: {'outfitId': bind.data.id,"review": bind.data.text},
          success: (response) => {
            my.navigateTo({ url: 'pages/outfit-social/index' });
            console.log(response)
            // this.setData({items: response.data.items,isLoading: false})
          }
        });
      },
      fail: function (res) {
        my.alert({ content: res.errorMessage });
      }
    });
  },
	onLoad(query) {
    this.setData({id: query})
	},
	onReady() {
	},
	async onShow() {
    // this.setData({isLoading: true})
    my.request({
      url: `https://127.0.0.1:5000/get-outfit?outfit_id=${this.data.id}`,
      method: 'GET',
      // headers: {
      //   "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1NTk0NjU2MSwianRpIjoiZGYyY2IyZjEtNzAyMC00NWVlLWI2ZjgtMTNkYjk4ZDJlMzAwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImxvbmcubHQiLCJuYmYiOjE2NTU5NDY1NjEsImV4cCI6MTY4NzQ4MjU2MX0.uIMrMgymKshKfpI8iXPln1ByRA63wUoffnhcYwBPiC8"
      // },
      success: (response) => {
        console.log(response)
        this.setData({items: response.data.items})
      }
    });
  },
	onHide() {
	},
	onUnload() {
	}
});