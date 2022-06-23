Page({
  data: {
    items: [
      {
          "index": 1,
          "name": "mock neck embroidery suede sweatshirt",
          "price": 24.0,
          "likes": 10,
          "image": "/assets/image/0/1.jpg",
          "categoryid": 4495
      },
      {
          "index": 2,
          "name": "luxe double zip hooded jacket",
          "price": 150.0,
          "likes": 2250,
          "image": "/assets/image/0/2.jpg",
          "categoryid": 25
      }
  ],
    id: undefined,
    isLoading: true
  },
	onLoad(query) {
    this.setData({id: query})
	},
	async onShow() {
    this.setData({isLoading: true})
    my.request({
      url: `https://127.0.0.1:5000/get-outfit?outfit_id=${this.data.id}`,
      method: 'GET',
      // headers: {
      //   "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1NTk0NjU2MSwianRpIjoiZGYyY2IyZjEtNzAyMC00NWVlLWI2ZjgtMTNkYjk4ZDJlMzAwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImxvbmcubHQiLCJuYmYiOjE2NTU5NDY1NjEsImV4cCI6MTY4NzQ4MjU2MX0.uIMrMgymKshKfpI8iXPln1ByRA63wUoffnhcYwBPiC8"
      // },
      success: (response) => {
        console.log(response)
        this.setData({items: response.data.items,isLoading: false})
      }
    });
  },
});