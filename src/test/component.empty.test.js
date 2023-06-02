import Empty from '../components/common/Empty.vue';
import {
    shallowMount
} from '@vue/test-utils';


describe('Empty', () => {
    const Wrapper = shallowMount(Empty)
    console.log(Wrapper.classes())	//['empty-wrap']
    // console.log(Wrapper.classes('empty-wrap'))	//true
    // console.log(Wrapper.find('.name').text())	// 切记如果是类的话，要加点  ： 啦啦
    // console.log(Wrapper.findAll('.name'))	//返回dom数组  WrapperArray { selector: '.name' }
    // console.log(Wrapper.findAll('.name').at(0))	//取dom数组中的第一个
    // Wrapper.setData({text : 3})   //  设置一个值 
    // console.log(Wrapper.vm.text)	// 3
    // Wrapper.setProps({name : "拉拉"})
    // console.log(Wrapper.vm.name)	//这个结果仍 为 啦啦啦
})