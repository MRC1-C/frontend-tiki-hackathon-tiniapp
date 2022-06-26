Component({
  props: {
    outfit: {},
  },

  methods: {
    onReview(){
      my.navigateTo({url: `pages/fashion-review/index?${this.props.outfit['_id']['$oid']}`})
    },
    handleNavigate(){
      my.navigateTo({url: `pages/outfit-detail/index?${this.props.outfit['_id']['$oid']}`})
    }
  },
});
