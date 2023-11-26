import axios from "axios";
const apiEndPoint = process.env.API_END_POINT;
class ApiClass {
  constructor() {
    this.request = [];
    this._axios = axios.create({
      baseURL: apiEndPoint || "",
      headers: {},
    });
    this._interceptors();
  }
  set Authorization(AUTH) {
    this._axios.defaults.headers.Authorization = AUTH;
  }
  set baseUrl(url) {
    this._axios.defaults.baseURL = url;
  }
  get baseURL() {
    return this._axios.defaults.baseURL;
  }
  get cancelToken() {
    return axios.CancelToken.source();
  }
  _interceptors() {
    this._axios.interceptors.request.use((request) => {
      if (request.data?.cancelToken) delete request.data.cancelToken;
      request.data = this._clean(request.data);
      return request;
    });
    this._interceptorsResponse();
  }
  _requestState(request) {
    const t = {};
    return Promise.race([request.axios, t]).then(
      (v) =>
        v === t
          ? { request, status: "pending" }
          : { request, status: "fulfilled" },
      () => ({ request, status: "rejected" })
    );
  }
  async cancelRequest({ regexRoute }) {
    const pending = await this._pendingRequests();
    pending.map((p) => {
      if (regexRoute && !!p.request.url.match(regexRoute))
        p.request.cancelSource.cancel(`Avoid multiple by ${regexRoute}`);
    });
  }
  _validateStringDataError(data) {
    if (!data) data = [];
    if (typeof data == "string") return data;
    if (data.length == undefined) data = [data];
    const aTexts = data.filter((message) => typeof message == "string");
    if (aTexts.length) return aTexts.join("<br />");
    else return null;
  }
  _interceptorsResponse() {
    this._axios.interceptors.response.use(
      (response) => {
        if (String(response.status).match(/20[0-9]/g)) {
          return response.data;
        } else {
          console.warn("❗️ Request", { response });
        }
        return response;
      },
      (err) => {
        const { response, message } = err || {};
        console.log(err);
        const aborted = axios.isCancel(err);
        if (aborted)
          return Promise.reject({
            aborted,
            data: [],
            error: err.code,
            message: err.config?.signal?.reason || err.message,
          });
        const { status, data } = response || {};
        const dataText = this._validateStringDataError(data?.data);
        const text = this._validateStringDataError(data?.messagedev);
        const dataSourceError = data?.status || data?.http_status_code;
        const error =
          dataText || text || `${dataSourceError || ""} - ${message}`;
        let core_response = { status, data, error, aborted };
        return Promise.reject(core_response);
      }
    );
  }
  _clean(obj) {
    for (var propName in obj) {
      if (
        String(obj[propName]).replace(/ /g, "") === "" ||
        obj[propName] === undefined
      ) {
        obj[propName] = null;
      }
    }
    return obj;
  }
  makeRequest(request) {
    const { method, data, url, headers = {} } = request;
    const cancelSource = this.cancelToken;
    const axiosRequest = {
      cancelToken: cancelSource.token,
      ...(data || {}),
    };
    const R = { url: `${method}:${url}`, cancelSource };
    R.axios = this._axios[method](`${url}`, axiosRequest, { ...headers });
    this.request.push(R);
    return R.axios;
  }
  delete(url, data = {}) {
    return this.makeRequest({ method: "delete", url, data: { data } });
  }
  get(url, data = {}) {
    return this.makeRequest({ method: "get", url, data });
  }
  post(url, data = {}, headers) {
    return this.makeRequest({ method: "post", url, data, headers });
  }
  put(url, data = {}, headers) {
    return this.makeRequest({ method: "put", url, data, headers });
  }
  patch(url, data = {}) {
    return this.makeRequest({ method: "patch", url, data });
  }
}
export default new ApiClass();
