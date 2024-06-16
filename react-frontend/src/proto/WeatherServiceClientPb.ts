/**
 * @fileoverview gRPC-Web generated client stub for weather
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v3.19.2
// source: weather.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as weather_pb from './weather_pb'; // proto import: "weather.proto"


export class WeatherServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorGetWeather = new grpcWeb.MethodDescriptor(
    '/weather.WeatherService/GetWeather',
    grpcWeb.MethodType.UNARY,
    weather_pb.WeatherRequest,
    weather_pb.WeatherResponse,
    (request: weather_pb.WeatherRequest) => {
      return request.serializeBinary();
    },
    weather_pb.WeatherResponse.deserializeBinary
  );

  getWeather(
    request: weather_pb.WeatherRequest,
    metadata?: grpcWeb.Metadata | null): Promise<weather_pb.WeatherResponse>;

  getWeather(
    request: weather_pb.WeatherRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: weather_pb.WeatherResponse) => void): grpcWeb.ClientReadableStream<weather_pb.WeatherResponse>;

  getWeather(
    request: weather_pb.WeatherRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: weather_pb.WeatherResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/weather.WeatherService/GetWeather',
        request,
        metadata || {},
        this.methodDescriptorGetWeather,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/weather.WeatherService/GetWeather',
    request,
    metadata || {},
    this.methodDescriptorGetWeather);
  }

}
