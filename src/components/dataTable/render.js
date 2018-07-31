import radioBtn from './radioBtn'
import elPop from './elPopover'
export default {
  name: 'cell',
  functional: true,
  components:{
    radioBtn,
    elPop
  },
  props: {
    params: Object,
    render: Function,
  },
  render: (h, ctx) => {
    const params = ctx.props.params

    return ctx.props.render(h, params);
  }
};
