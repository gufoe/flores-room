let is_local = location.hostname == 'localhost'

export default {
  api_url: (is_local ? 'http://floresroom.x' : '') + '/api/',
  fb_key: is_local ? '1842460349364769' : '2189561351345047',
  app_url: is_local ? location.href.split('#')[0].split('?')[0] : 'https://www.floresroom.com/',
}
