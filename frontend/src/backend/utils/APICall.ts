import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { removeUndefinedProps } from '../../utils/FormatterValues'
import { ErrorResponseModel } from '../models/Error/ErrorResponseModel';

export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
};

export enum HeaderContentType {
    JSON = 'application/json',
    URL_ENCODED = 'application/x-www-form-urlencoded',
    FORM_DATA = 'multipart/form-data',
};

export type HTTPHeader = {
    [x: string]: string;
}

export interface HeaderParameters {
    key: string;
    value: any;
};

export interface APICallRequest {
    method: HTTPMethod;
    path: String;
    contentType?: HeaderContentType;
    headers?: HTTPHeader;
    parameters?: HeaderParameters[];
    body?: any;
};

export interface Result<T> {
    data: T;
    error: ErrorResponseModel;
}

export function makeAPICall<R> (req: APICallRequest): Promise<R> {
    return new Promise<R>(async (resolve, reject) => {
        const url = process.env.REACT_APP_VELAUTO_API_URL;

        var config: AxiosRequestConfig = {
            method: req.method,
            url: `${req.path.includes('http') ? '' : url}${req.path}${req.parameters ? '?' + formatParams(req.parameters) : ''}`,
            data: req.body
        };

        config = removeUndefinedProps(config);

        if (process.env.REACT_APP_NODE_ENV !== 'production') {
            console.log("-------------------------------------------------------");
            console.log("⬆︎ Calling")
            console.log(config);
            console.log("-------------------------------------------------------");
        }

        axios.request<R>(config)
            .then(response => {
                if (process.env.REACT_APP_NODE_ENV !== 'production') {
                    console.log("-------------------------------------------------------");
                    console.log("⬇︎ Response")
                    console.log(response);
                    console.log("-------------------------------------------------------");
                }
                resolve(response.data);
            })
            .catch(error => {
                if (process.env.REACT_APP_NODE_ENV !== 'production') {
                    console.log("-------------------------------------------------------");
                    console.log("⬇︎ Error")
                    const errorAxios = error as AxiosError;
                    if (errorAxios.response) {
                        console.log(errorAxios.response.data as ErrorResponseModel);
                    } else {
                        console.log(error);
                    }
                    console.log("-------------------------------------------------------");
                }
                reject(error);
            });
    });
};

const formatParams = (params: HeaderParameters[]) => {
    return params.map(param => {
        return `${param.key}=${(typeof param.value === 'object') ? JSON.stringify(param.value) : param.value}`;
    }).join('&');
};

export const formatError = (error: any): ErrorResponseModel => {
    const errorAxios = error as AxiosError;
    var errorResponse: ErrorResponseModel = {
        success: false,
        errorCode: '',
        messages: [],
        error: ''
    };
    
    if (errorAxios.response) {
        errorResponse = errorAxios.response.data as ErrorResponseModel;
    }

    if (errorResponse.messages === undefined || errorResponse.messages.length === 0) {
        errorResponse = {
            success: false,
            errorCode: errorAxios.response?.status.toString() || '',
            messages: errorAxios.message ? errorAxios.message === 'Network Error' ? ['Não foi possível conectar ao servidor'] : errorAxios.message === 'Request failed with status code 429' ? ['Foram realizadas muitas requisições em pouco tempo, aguarde um tempo para poder utilizar novamente'] : [errorAxios.message] : [''],
            error: '',
        };
    }

    return errorResponse;
};