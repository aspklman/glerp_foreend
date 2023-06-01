import { getAction,deleteAction,putAction,postAction} from '@/api/manage'

////根路径
// const doMian = "/jeecg-boot/";
////图片预览请求地址
// const imgView = "http://localhost:8080/jeecg-boot/sys/common/view/";

//角色管理
const addRole = (params)=>postAction("/sys/role/add",params);
const editRole = (params)=>putAction("/sys/role/edit",params);
// const getRoleList = (params)=>getAction("/sys/role/list",params);
// const deleteRole = (params)=>deleteAction("/sys/role/delete",params);
// const deleteRoleList = (params)=>deleteAction("/sys/role/deleteBatch",params);
const checkRoleCode = (params)=>getAction("/sys/role/checkRoleCode",params);
const queryall = (params)=>getAction("/sys/role/queryall",params);

//用户管理
const addUser = (params)=>postAction("/sys/user/add",params);
const editUser = (params)=>putAction("/sys/user/edit",params);
const queryUserRole = (params)=>getAction("/sys/user/queryUserRole",params);
const getUserList = (params)=>getAction("/sys/user/list",params);
// const deleteUser = (params)=>deleteAction("/sys/user/delete",params);
// const deleteUserList = (params)=>deleteAction("/sys/user/deleteBatch",params);
const frozenBatch = (params)=>putAction("/sys/user/frozenBatch",params);
//验证用户是否存在
const checkOnlyUser = (params)=>getAction("/sys/user/checkOnlyUser",params);
//改变密码
const changPassword = (params)=>putAction("/sys/user/changPassword",params);

//权限管理
const addPermission= (params)=>postAction("/sys/permission/add",params);
const editPermission= (params)=>putAction("/sys/permission/edit",params);
const getPermissionList = (params)=>getAction("/sys/permission/list",params);
// const deletePermission = (params)=>deleteAction("/sys/permission/delete",params);
// const deletePermissionList = (params)=>deleteAction("/sys/permission/deleteBatch",params);
const queryTreeList = (params)=>getAction("/sys/permission/queryTreeList",params);
const queryTreeListForRole = (params)=>getAction("/sys/role/queryTreeList",params);
const queryListAsync = (params)=>getAction("/sys/permission/queryListAsync",params);
const queryRolePermission = (params)=>getAction("/sys/permission/queryRolePermission",params);
const saveRolePermission = (params)=>postAction("/sys/permission/saveRolePermission",params);
//const queryPermissionsByUser = (params)=>getAction("/sys/permission/queryByUser",params);
const queryPermissionsByUser = (params)=>getAction("/sys/permission/getUserPermissionByToken",params);
const loadAllRoleIds = (params)=>getAction("/sys/permission/loadAllRoleIds",params);
const getPermissionRuleList = (params)=>getAction("/sys/permission/getPermRuleListByPermId",params);
const queryPermissionRule = (params)=>getAction("/sys/permission/queryPermissionRule",params);

// 部门管理
const queryDepartTreeList = (params)=>getAction("/sysdepart/sysDepart/queryTreeList",params);
const queryIdTree = (params)=>getAction("/sysdepart/sysDepart/queryIdTree",params);
const queryParentName   = (params)=>getAction("/sysdepart/sysDepart/queryParentName",params);
const searchByKeywords   = (params)=>getAction("/sysdepart/sysDepart/searchBy",params);
const deleteByDepartId   = (params)=>deleteAction("/sysdepart/sysDepart/delete",params);

//日志管理
//const getLogList = (params)=>getAction("/sys/log/list",params);
const deleteLog = (params)=>deleteAction("/sys/log/delete",params);
const deleteLogList = (params)=>deleteAction("/sys/log/deleteBatch",params);

//数据字典
const addDict = (params)=>postAction("/sys/dict/add",params);
const editDict = (params)=>putAction("/sys/dict/edit",params);
//const getDictList = (params)=>getAction("/sys/dict/list",params);
const treeList = (params)=>getAction("/sys/dict/treeList",params);
// const delDict = (params)=>deleteAction("/sys/dict/delete",params);
//const getDictItemList = (params)=>getAction("/sys/dictItem/list",params);
const addDictItem = (params)=>postAction("/sys/dictItem/add",params);
const editDictItem = (params)=>putAction("/sys/dictItem/edit",params);
//const delDictItem = (params)=>deleteAction("/sys/dictItem/delete",params);
//const delDictItemList = (params)=>deleteAction("/sys/dictItem/deleteBatch",params);

//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params)=>getAction(`/sys/dict/getDictItems/${code}`,params);

//系统通告
const doReleaseData = (params)=>getAction("/sys/annountCement/doReleaseData",params);
const doReovkeData = (params)=>getAction("/sys/annountCement/doReovkeData",params);
//获取系统访问量
const getLoginfo = (params)=>getAction("/sys/loginfo",params);
const getVisitInfo = (params)=>getAction("/sys/visitInfo",params);
//数据日志访问
// const getDataLogList = (params)=>getAction("/sys/dataLog/list",params);

// 根据部门主键查询用户信息
const queryUserByDepId = (params)=>getAction("/sys/user/queryUserByDepId",params);

// 查询用户角色表里的所有信息
const queryUserRoleMap = (params)=>getAction("/sys/user/queryUserRoleMap",params);
// 重复校验
const duplicateCheck = (params)=>getAction("/sys/duplicate/check",params);

// 固定资产
const getKindNoMainList = (params)=>getAction("/asset/basicMainKind/list",params);
const getKindNoMidList = (params)=>getAction("/asset/basicMidKind/list",params);
const getKindNoSmallList = (params)=>getAction("/asset/basicSmallKind/list",params);
const getAssetVendormList = (params)=>getAction("/asset/assetVendorm/list",params);
const getOrgUnitList = (params)=>getAction("/asset/orgUnit/list",params);
const getOrgGroupList = (params)=>getAction("/asset/orgGroup/list",params);
const getAssetNoList = (params)=>getAction("/asset/assetRecord/list",params);

//客户管理
const getCustomList = (params)=>getAction("/order/custom/list",params);     //****** 第一步：定义

//品牌管理
const getBrandList = (params)=>getAction("/bom/brand/list",params);

//目的地管理
const getCountryList = (params)=>getAction("/order/country/list",params);

//型体管理
const getStylemList = (params)=>getAction("/bom/stylem/list",params);

//增值管理
const getVacodeList = (params)=>getAction("/scan/vacode/list",params);

//材料管理
const getMatmList = (params)=>getAction("/bom/matm/list",params);

//仓库管理
const getStkidmList = (params)=>getAction("/stock/stkidm/list",params);

//存放区域管理
const getLocateList = (params)=>getAction("/stock/locate/list",params);

//存放地点管理
const getAreasList = (params)=>getAction("/stock/areas/list",params);

//派工阶段管理
const getDeptmList = (params)=>getAction("/product/deptm/list",params);

//产量阶段管理
const getStgmList = (params)=>getAction("/product/stgm/list",params);

//组别管理(旧)
const getSecList = (params)=>getAction("/product/sec/list",params);

//组别管理(新)
const getDepartList = (params)=>getAction("/product/depart/list",params);


export {
  // imgView,
  // doMian,
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
  queryUserRole,
  getUserList,
  queryall,
  frozenBatch,
  checkOnlyUser,
  changPassword,
  getPermissionList,
  addPermission,
  editPermission,
  queryTreeList,
  queryListAsync,
  queryRolePermission,
  saveRolePermission,
  queryPermissionsByUser,
  loadAllRoleIds,
  getPermissionRuleList,
  queryPermissionRule,
  queryDepartTreeList,
  queryIdTree,
  queryParentName,
  searchByKeywords,
  deleteByDepartId,
  deleteLog,
  deleteLogList,
  addDict,
  editDict,
  treeList,
  addDictItem,
  editDictItem,
  doReleaseData,
  doReovkeData,
  getLoginfo,
  getVisitInfo,
  queryUserByDepId,
  queryUserRoleMap,
  duplicateCheck,
  queryTreeListForRole,

  getCustomList,    //****** 第二步：输出

  getKindNoMainList,      //固定资产-大分类
  getKindNoMidList,       //固定资产-中分类
  getKindNoSmallList,     //固定资产-明细类
  getAssetVendormList,    //固定资产-供应商
  getOrgUnitList,         //固定资产-OA组织信息表
  getOrgGroupList,         //固定资产-OA班组表
  getAssetNoList,         //固定资产-资产档案

  getBrandList,     //品牌
  getCountryList,   //目的地
  getStylemList,    //型体
  getVacodeList,    //增值
  getMatmList,       //材料
  getStkidmList,       //仓库
  getLocateList,       //存放区域
  getAreasList,       //存放地点
  getDeptmList,     //派工阶段
  getStgmList,      //产量阶段
  getSecList,       //组别(旧)
  getDepartList,       //组别(新)
}



