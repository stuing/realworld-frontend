request = async ({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
}) => {
    const secureParams =
        ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
            this.securityWorker &&
            (await this.securityWorker(this.securityData))) ||
        {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
        ...requestParams,
        headers: {
            ...(requestParams.headers || {}),
            ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
        const r = response;
        r.data = null;
        r.error = null;

        const data = !responseFormat
            ? r
            : await response[responseFormat]()
                .then((data) => {
                    if (r.ok) {
                        r.data = data;
                    } else {
                        r.error = data;
                    }
                    return r;
                })
                .catch((e) => {
                    r.error = e;
                    return r;
                });

        if (cancelToken) {
            this.abortControllers.delete(cancelToken);
        }

        if (!response.ok) throw data;
        return data;
    });
};


customFetch = (...fetchParams) => fetch(...fetchParams);
