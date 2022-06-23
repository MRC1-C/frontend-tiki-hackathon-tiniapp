Page({
	data: {
    isLoading: true,
    current: undefined,
    outfit: undefined,
  },
  onChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  onUploadOutfit(){
    my.navigateTo({url: 'pages/upload-outfit/index'})
  },
  //life circle
  async onShow() {
    let bind = this
    my.getStorage({
      key: 'access_token',
      success: function (res) {
        bind.setData({isLoading: true})
    my.request({
      url: 'https://127.0.0.1:5000/get-my-outfit',
      method: 'GET',
      headers: {
        "Authorization": 'Bearer ' + res.data
      },
      success: (response) => {
        console.log('asdf')
        bind.setData({outfit: response.data,isLoading: false})
      }
    });
      },
      fail: function (res) {
        my.alert({ content: res.errorMessage });
      }
    });
    
  },

  // async onShow() {
  //   setTimeout(()=>{console.log('2')},1000)
  // },
});