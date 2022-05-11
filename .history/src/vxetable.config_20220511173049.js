/*
 * @Author: gongnan
 * @Date: 2022-05-07 16:51:47
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-11 17:30:49
 * @Description: file content
 * @FilePath: \front\src\vxetable.config.js
 */
import * as XEUtils  from 'xe-utils'
import {
	// 全局对象
	VXETable,

	// 表格功能
	Header,
	Footer,
	Icon,
	Filter,
	Edit,
	Menu,
	Export,
	Keyboard,
	Validator,

	// 可选组件
	Column,
	Colgroup,
	Grid,
	Tooltip,
	Toolbar,
	Pager,
	Form,
	FormItem,
	FormGather,
	Checkbox,
	CheckboxGroup,
	Radio,
	RadioGroup,
	RadioButton,
	Switch,
	Input,
	Select,
	Optgroup,
	Option,
	Textarea,
	Button,
	Modal,
	List,
	Pulldown,

	// 表格
	Table
} from 'vxe-table'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
	i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
	 icon: {
	   // table
	   TABLE_SORT_ASC: 'vxe-icon--caret-top',
	   TABLE_SORT_DESC: 'vxe-icon--caret-bottom',
	   TABLE_FILTER_NONE: 'vxe-icon--funnel',
	   TABLE_FILTER_MATCH: 'vxe-icon--funnel',
	   TABLE_EDIT: 'vxe-icon--edit-outline',
	   TABLE_TREE_LOADED: 'vxe-icon--refresh roll',
	   TABLE_TREE_OPEN: 'vxe-icon--caret-right rotate90',
	   TABLE_TREE_CLOSE: 'vxe-icon--caret-right',
	   TABLE_EXPAND_LOADED: 'vxe-icon--refresh roll',
	   TABLE_EXPAND_OPEN: 'vxe-icon--arrow-right rotate90',
	   TABLE_EXPAND_CLOSE: 'vxe-icon--arrow-right',

	   // button
	   BUTTON_DROPDOWN: 'vxe-icon--arrow-bottom',
	   BUTTON_LOADING: 'vxe-icon--refresh roll',

	   // select
	   SELECT_OPEN: 'vxe-icon--caret-bottom rotate180',
	   SELECT_CLOSE: 'vxe-icon--caret-bottom',

	   // pager
	   PAGER_JUMP_PREV: 'vxe-icon--d-arrow-left',
	   PAGER_JUMP_NEXT: 'vxe-icon--d-arrow-right',
	   PAGER_PREV_PAGE: 'vxe-icon--arrow-left',
	   PAGER_NEXT_PAGE: 'vxe-icon--arrow-right',
	   PAGER_JUMP_MORE: 'vxe-icon--more',

	   // input
	   INPUT_CLEAR: 'vxe-icon--close',
	   INPUT_PWD: 'vxe-icon--eye-slash',
	   INPUT_SHOW_PWD: 'vxe-icon--eye',
	   INPUT_PREV_NUM: 'vxe-icon--caret-top',
	   INPUT_NEXT_NUM: 'vxe-icon--caret-bottom',
	   INPUT_DATE: 'vxe-icon--calendar',
	   INPUT_SEARCH: 'vxe-icon--search',

	   // modal
	   MODAL_ZOOM_IN: 'vxe-icon--square',
	   MODAL_ZOOM_OUT: 'vxe-icon--zoomout',
	   MODAL_CLOSE: 'vxe-icon--close',
	   MODAL_INFO: 'vxe-icon--info',
	   MODAL_SUCCESS: 'vxe-icon--success',
	   MODAL_WARNING: 'vxe-icon--warning',
	   MODAL_ERROR: 'vxe-icon--error',
	   MODAL_QUESTION: 'vxe-icon--question',
	   MODAL_LOADING: 'vxe-icon--refresh roll',

	   // toolbar
	   TOOLBAR_TOOLS_REFRESH: 'vxe-icon--refresh',
	   TOOLBAR_TOOLS_REFRESH_LOADING: 'vxe-icon--refresh roll',
	   TOOLBAR_TOOLS_IMPORT: 'vxe-icon--upload',
	   TOOLBAR_TOOLS_EXPORT: 'vxe-icon--download',
	   TOOLBAR_TOOLS_ZOOM_IN: 'vxe-icon--zoomin',
	   TOOLBAR_TOOLS_ZOOM_OUT: 'vxe-icon--zoomout',
	   TOOLBAR_TOOLS_CUSTOM: 'vxe-icon--menu',

	   // form
	   FORM_PREFIX: 'vxe-icon--info',
	   FORM_SUFFIX: 'vxe-icon--info',
	   FORM_FOLDING: 'vxe-icon--arrow-top rotate180',
	   FORM_UNFOLDING: 'vxe-icon--arrow-top'
	 }
})
export default  {
	install(app) {
		// 表格功能
		app.use(Header)
			.use(Footer)
			.use(Icon)
			.use(Filter)
			.use(Edit)
			.use(Menu)
			.use(Export)
			.use(Keyboard)
			.use(Validator)

			// 可选组件
			.use(Column)
			.use(Colgroup)
			.use(Grid)
			.use(Tooltip)
			.use(Toolbar)
			.use(Pager)
			.use(Form)
			.use(FormItem)
			.use(FormGather)
			.use(Checkbox)
			.use(CheckboxGroup)
			.use(Radio)
			.use(RadioGroup)
			.use(RadioButton)
			.use(Switch)
			.use(Input)
			.use(Select)
			.use(Optgroup)
			.use(Option)
			.use(Textarea)
			.use(Button)
			.use(Modal)
			.use(List)
			.use(Pulldown)

			// 安装表格
			.use(Table)
	}
}
