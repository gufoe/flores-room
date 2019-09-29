import Vue from 'vue'
import PriceInput from '@/components/price-input'
import Price from '@/components/price'
import SearchBox from '@/components/search-box'
import LoadingScreen from '@/components/loading-screen'
import LocationInput from '@/components/location-input'
import NumberInput from '@/components/number-input'

Vue.component('price', Price)
Vue.component('price-input', PriceInput)
Vue.component('search-box', SearchBox)
Vue.component('loading-screen', LoadingScreen)
Vue.component('location-input', LocationInput)
Vue.component('number-input', NumberInput)
