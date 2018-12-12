import {shallow} from '@vue/test-utils'
import HelloWorld from '../src/components/HelloWorld.vue'

describe('HelloWorld.vue',function(){

    it('Checking <h2> tag text',function(){

        const wrapper = shallow(HelloWorld)
        const h2= wrapper.find('h2')
        expect(h2.text()).toBe('Essential Links')

    })
})