import * as jspb from 'google-protobuf'



export class WeatherRequest extends jspb.Message {
  getCity(): string;
  setCity(value: string): WeatherRequest;

  getLang(): string;
  setLang(value: string): WeatherRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WeatherRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WeatherRequest): WeatherRequest.AsObject;
  static serializeBinaryToWriter(message: WeatherRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WeatherRequest;
  static deserializeBinaryFromReader(message: WeatherRequest, reader: jspb.BinaryReader): WeatherRequest;
}

export namespace WeatherRequest {
  export type AsObject = {
    city: string,
    lang: string,
  }
}

export class WeatherResponse extends jspb.Message {
  getCity(): string;
  setCity(value: string): WeatherResponse;

  getTemperature(): number;
  setTemperature(value: number): WeatherResponse;

  getHumidity(): number;
  setHumidity(value: number): WeatherResponse;

  getWindSpeed(): number;
  setWindSpeed(value: number): WeatherResponse;

  getCondition(): string;
  setCondition(value: string): WeatherResponse;

  getCountry(): string;
  setCountry(value: string): WeatherResponse;

  getLang(): string;
  setLang(value: string): WeatherResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WeatherResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WeatherResponse): WeatherResponse.AsObject;
  static serializeBinaryToWriter(message: WeatherResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WeatherResponse;
  static deserializeBinaryFromReader(message: WeatherResponse, reader: jspb.BinaryReader): WeatherResponse;
}

export namespace WeatherResponse {
  export type AsObject = {
    city: string,
    temperature: number,
    humidity: number,
    windSpeed: number,
    condition: string,
    country: string,
    lang: string,
  }
}

