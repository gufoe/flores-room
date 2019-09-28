let is_local = location.hostname == 'localhost'

export default {
  api_url: (is_local ? 'http://floresroom.x' : 'https://floresroom.com') + '/api/',
  fb_key: is_local ? '1842460349364769' : '2189561351345047',
}
