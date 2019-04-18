import './middleware'

export default function ({ route, req }, inject) {
  const isAMP = Boolean(route.query.amp)
  inject('req', req || {})
  inject('isAMP', isAMP)
}
