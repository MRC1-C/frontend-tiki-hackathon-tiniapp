Page({
	data: {
    current: undefined,
    outfits: [],
    isLoading: true
  },
  onChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  onUploadOutfit(){
    my.navigateTo({url: 'pages/upload-outfit/index'})
  },
  async onShow(){
    let bind = this
    my.getStorage({
      key: 'access_token',
      success: function (res) {
        bind.setData({isLoading: true})
    my.request({
      url: 'https://127.0.0.1:5000/get-all-outfit?type=like',
      method: 'GET',
      headers: {
        "Authorization": 'Bearer ' + res.data
      },
      success: (response) => {
        console.log(response.data)
        bind.setData({outfits: response.data,isLoading: false})
      }
    });
      },
      fail: function (res) {
        my.alert({ content: res.errorMessage });
      }
    });
  }
});