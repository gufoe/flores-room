import config from './config'
// import lz from 'lzutf8'
let lz = {
  compress: x => btoa(x),
  decompress: x => atob(x),
}
export default {

  unpack (str) {
    return JSON.parse(lz.decompress(str, {
      inputEncoding: 'Base64'
    }))
  },

  pack (obj) {
    return lz.compress(JSON.stringify(obj), {
      outputEncoding: 'Base64'
    })
  },

  rand_str (len, alphabet) {
      alphabet = alphabet || 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm1234567890'
      let str = ''
      while (str.length < 10) str+= alphabet[Math.floor(Math.random()*alphabet.length)]
      return str
  },

  hash (thing) {
    if (typeof thing != 'string') thing = JSON.stringify(thing)

    var hash = 0;
    if (thing.length == 0) {
        return hash;
    }
    for (var i = 0; i < thing.length; i++) {
        var char = thing.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).toUpperCase()
  },

  clone (obj) {
      return JSON.parse(JSON.stringify(obj))
  },

  image_lg (token) {
      return config.api_url + '../storage/' + token + '-lg.jpg'
  },
  image_md (token) {
      return config.api_url + '../storage/' + token + '-md.jpg'
  },
  image_sm (token) {
      return config.api_url + '../storage/' + token + '-sm.jpg'
  },


  resizeImage (file, on_finish) {
    let img = new Image;
    let maxW=1000
    let maxH=1000
    img.onload = () => {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext("2d")
      let iw = img.width
      let ih = img.height
      let scale = Math.min((maxW/iw),(maxH/ih))
      let iwScaled = iw*scale
      let ihScaled = ih*scale
      canvas.width = iwScaled
      canvas.height = ihScaled
      ctx.drawImage(img,0,0,iwScaled,ihScaled)
      if (!canvas.toDataURL) return
      on_finish(canvas.toDataURL('image/jpeg', .85).replace('data:image/jpeg;base64,', ''))
    }
    console.log(file)
    img.src = URL.createObjectURL(file)
  },
}
