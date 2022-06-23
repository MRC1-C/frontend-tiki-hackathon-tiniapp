Page({
	data: {
    current: undefined,
    outfit: [{
      "name": "Casual",
      "views": 8743,
      "items": [
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
      "image": '/assets/image/0/0.jpg',
      "likes": 394,
      "date": "One month",
      "set_url": "http://www.polyvore.com/casual/set?id=214181831",
      "set_id": "214181831",
      "desc": "A fashion look from January 2017 by beebeely-look featuring Fuji, Citizens of Humanity, casual, casualoutfit, Packandgo, winterjacket and gearbest"
  },
  {
    "name": "Casual",
    "views": 2332,
    "items": [
        {
            "index": 1,
            "name": "mock neck embroidery suede sweatshirt",
            "price": 24.0,
            "likes": 10,
            "image": "/assets/image/1/1.jpg",
            "categoryid": 4495
        },
        {
            "index": 2,
            "name": "luxe double zip hooded jacket",
            "price": 150.0,
            "likes": 2250,
            "image": "/assets/image/1/2.jpg",
            "categoryid": 25
        }
    ],
    "image": "/assets/image/1/0.jpg",
    "likes": 200,
    "date": "One month",
    "set_url": "http://www.polyvore.com/casual/set?id=214181831",
    "set_id": "214181831",
    "desc": "fashion look from January 2017 by beebeely-look featuring Fuji, Citizens of Humanity, casual, casualoutfit, Packandgo, winterjacket and gearbest"
}
]
  },
  onChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  onUploadOutfit(){
    my.navigateTo({url: 'pages/upload-outfit/index'})
  }
});