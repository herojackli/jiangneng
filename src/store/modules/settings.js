import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import hongan4d from '@/utils/hongan4d'

const {
  showSettings,
  tagsView,
  tagsIcon,
  showLanguage,
  showSearch,
  useCache,
  fixedHeader,
  sidebarLogo,
  themeClass,
  slideClass,
  layoutType,
  sysConfig
} = defaultSettings

const state = {
  theme: variables.theme,
  loginNeedCode: hongan4d.storageGet('loginNeedCode') === null ? false : hongan4d.storageGet('loginNeedCode'),
  showSettings: showSettings,
  tagsView: hongan4d.storageGet('tagsView') === null ? tagsView : hongan4d.storageGet('tagsView'),
  tagsIcon: hongan4d.storageGet('tagsIcon') === null ? tagsIcon : hongan4d.storageGet('tagsIcon'),
  showLanguage: hongan4d.storageGet('showLanguage') === null ? showLanguage : hongan4d.storageGet('showLanguage'),
  showSearch: hongan4d.storageGet('showSearch') === null ? showSearch : hongan4d.storageGet('showSearch'),
  useCache: hongan4d.storageGet('useCache') === null ? useCache : hongan4d.storageGet('useCache'),
  fixedHeader: hongan4d.storageGet('fixedHeader') === null ? fixedHeader : hongan4d.storageGet('fixedHeader'),
  sidebarLogo: hongan4d.storageGet('sidebarLogo') === null ? sidebarLogo : hongan4d.storageGet('sidebarLogo'),
  themeClass: hongan4d.storageGet('themeClass') === null ? themeClass : hongan4d.storageGet('themeClass'),
  slideClass: hongan4d.storageGet('slideClass') === null ? slideClass : hongan4d.storageGet('slideClass'),
  layoutType: hongan4d.storageGet('layoutType') === null ? layoutType : hongan4d.storageGet('layoutType'),
  sysConfig: hongan4d.storageGet('sysConfig') === null ? sysConfig : hongan4d.storageGet('sysConfig')
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      hongan4d.storageSet({
        [key]: value
      })
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}