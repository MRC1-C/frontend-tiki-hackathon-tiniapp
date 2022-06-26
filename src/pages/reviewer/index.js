Page({
  data: {
    reviewer: []
  },
	onLoad(query) {
	},
	onReady() {
	},
	async onShow() {
    let bind = this
    my.getStorage({
      key: 'access_token',
      success: function (res) {
    my.request({
      url: 'https://127.0.0.1:5000/get-all-reviewer',
      method: 'GET',
      headers: {
        "Authorization": 'Bearer ' + res.data
      },
      success: (response) => {
        bind.setData({reviewer: response.data})
      }
    });
      },
      fail: function (res) {
        my.alert({ content: res.errorMessage });
      }
    });
  },
	onHide() {
	},
	onUnload() {
	}
});