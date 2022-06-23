Component({
  props: {
    current: undefined,
    outfit: [],
    social: false,
    id: undefined
  },

  methods: {
    onChange(e) {
      console.log('onChange: ', e.detail.current);
      console.log()
      let id = this.props.outfit[e.detail.current]['_id']['$oid']
      this.setData({
        current: e.detail.current,
        id: id
      })
    },
    onReview(){
      my.navigateTo({url: `pages/fashion-review/index?${this.data.id}`})
    },
    handleNavigate(){
      my.navigateTo({url: `pages/outfit-detail/index?${this.data.id?this.data.id:this.props.outfit[0]['_id']['$oid']}`})
    }
  },
});
