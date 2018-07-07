export default function (view) {
  var view=view;
  return function (name) {
    return () => import(`@/views/${view}/${name}`)
  }
}
