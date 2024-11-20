interface IAnkhConf {
  auth: IAnkhConfAuth
}
interface IAnkhConfAuth {
  mode: EAnkhConfAuthMode
}

enum EAnkhConfAuthMode {
  InApp,
  Entire,
}

const conf: IAnkhConf = {
  auth: {
    mode: EAnkhConfAuthMode.InApp,
  },
}

export { conf }
export { EAnkhConfAuthMode }
