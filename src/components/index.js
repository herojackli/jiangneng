import HONGAN4DTreeSelect from '@/components/HONGAN4D-treeSelect'
import topOperation from '@/components/HONGAN4D-topOperation/index'
import tableOperation from '@/components/HONGAN4D-tableOperation'
import Pagination from '@/components/Pagination'
import HONGAN4DTable from '@/components/HONGAN4D-table'
import hongan4dFormTipItem from '@/components/HONGAN4D-form-tip-item'
import UserBox from '@/components/HONGAN4D-userBox'
import Screenfull from '@/components/Screenfull'
import ColumnSettings from '@/components/ColumnSettings'
import HONGAN4DQuill from '@/components/HONGAN4DEditor/quill'
import UserSelect from '@/components/HONGAN4D-userSelect'
import uploadBtn from '@/components/HONGAN4D-uploadBtn'
// 代码生成器专供
import HONGAN4DText from '@/components/Generator/components/HONGAN4DText'
import Hongan4dBarcode from '@/components/Generator/components/Hongan4dBarcode'
import Hongan4dQrcode from '@/components/Generator/components/Hongan4dQrcode'
import Hongan4dButton from '@/components/Generator/components/Hongan4dButton'
import HONGAN4DUploadFz from '@/components/Generator/components/Upload/UploadFz'
import HONGAN4DUploadImg from '@/components/Generator/components/Upload/UploadImg'
import PopupSelect from '@/components/Generator/components/PopupSelect'
import PopupAttr from '@/components/Generator/components/PopupAttr'
import NumRange from '@/components/Generator/components/NumRange'
import ComSelect from '@/components/Generator/components/ComSelect'
import DepSelect from '@/components/Generator/components/DepSelect'
import PosSelect from '@/components/Generator/components/PosSelect'
import DicSelect from '@/components/Generator/components/DicSelect'
import BillRule from '@/components/Generator/components/BillRule'
import HONGAN4DInputTable from '@/components/Generator/components/InputTable'
import HONGAN4DAddress from '@/components/Generator/components/Address'
import GroupTitle from '@/components/Generator/components/GroupTitle'
import RelationForm from '@/components/Generator/components/RelationForm'
import RelationFormAttr from '@/components/Generator/components/RelationFormAttr'
import Calculate from '@/components/Generator/components/Calculate'

export default {
  install(Vue, options) {
    Vue.component('HONGAN4DTreeSelect', HONGAN4DTreeSelect)
    Vue.component('topOpts', topOperation)
    Vue.component('tableOpts', tableOperation)
    Vue.component('Pagination', Pagination)
    Vue.component('HONGAN4DTable', HONGAN4DTable)
    Vue.component('hongan4dFormTipItem', hongan4dFormTipItem)
    Vue.component('uploadBtn', uploadBtn)
    Vue.component('UserBox', UserBox)
    Vue.component('HONGAN4DText', HONGAN4DText)
    Vue.component('Hongan4dBarcode', Hongan4dBarcode)
    Vue.component('Hongan4dQrcode', Hongan4dQrcode)
    Vue.component('Hongan4dButton', Hongan4dButton)
    Vue.component('HONGAN4DUploadFz', HONGAN4DUploadFz)
    Vue.component('HONGAN4DUploadImg', HONGAN4DUploadImg)
    Vue.component('PopupSelect', PopupSelect)
    Vue.component('PopupAttr', PopupAttr)
    Vue.component('NumRange', NumRange)
    Vue.component('ComSelect', ComSelect)
    Vue.component('DepSelect', DepSelect)
    Vue.component('PosSelect', PosSelect)
    Vue.component('UserSelect', UserSelect)
    Vue.component('DicSelect', DicSelect)
    Vue.component('BillRule', BillRule)
    Vue.component('HONGAN4DInputTable', HONGAN4DInputTable)
    Vue.component('HONGAN4DAddress', HONGAN4DAddress)
    Vue.component('GroupTitle', GroupTitle)
    Vue.component('RelationForm', RelationForm)
    Vue.component('RelationFormAttr', RelationFormAttr)
    Vue.component('Calculate', Calculate)
    Vue.component('HONGAN4DQuill', HONGAN4DQuill)
    Vue.component('Screenfull', Screenfull)
    Vue.component('ColumnSettings', ColumnSettings)
  }
}