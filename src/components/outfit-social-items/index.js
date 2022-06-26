Component({
  data: {
    like: undefined
  },
  props: {
    outfit: {},
  },

  methods: {
    onReview(){
      my.navigateTo({url: `pages/fashion-review/index?${this.props.outfit['_id']['$oid']}`})
    },
    handleNavigate(){
      my.navigateTo({url: `pages/outfit-detail/index?${this.props.outfit['_id']['$oid']}`})
    },
    onLike(){
      let bind = this
    my.getStorage({
      key: 'access_token',
      success: function (res) {
        my.request({
          url: 'https://127.0.0.1:5000/like-outfit',
          method: 'POST',
          headers: {
            "Authorization": "Bearer "+ res.data
          },
          data: {'outfitId': bind.props.outfit['_id']['$oid']},
          success: (response) => {
            // my.navigateTo({ url: 'pages/outfit-social/index' });
            // my.request({
            //   url: `https://127.0.0.1:5000/get-outfit?outfit_id=${bind.props.outfit['_id']['$oid']}`,
            //   method: 'GET',
            //   success: (response) => {
            //     this.setData({outfit: [...this.data.outfits,{...response.data,'reviewContent': this.props.reviewContent[index]}]})
            //   }
            // });
            // if(!bind.data.like)
              bind.setData({like: bind.data.like?bind.data.like+1:bind.props.outfit['likes']+1})
            // this.setData({items: response.data.items,isLoading: false})
          }
        });
      },
      fail: function (res) {
        my.alert({ content: res.errorMessage });
      }
    });
    }
  },
});
