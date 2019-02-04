import { parseComment } from "../src/parse-mydata";
import * as assert from "assert";

describe("parse-mydata", function() {
    it("should parse 1", () => {
        const text = "[WebRTC][QUIC][Chrome][article]Chrome 73でQUICでの接続してデータのやりとりをするAPIである`RTCQuicTransport`のOrigin Trialが開始された。 WebRTC NV(Next Version)への取り組みとして、UDP上のQUICを使ったLow Level APIの策定が目的。";
        assert.deepStrictEqual(parseComment(text), {
            tags: ["WebRTC",
                "QUIC",
                "Chrome",
                "article"],
            comment: "Chrome 73でQUICでの接続してデータのやりとりをするAPIである`RTCQuicTransport`のOrigin Trialが開始された。 WebRTC NV(Next Version)への取り組みとして、UDP上のQUICを使ったLow Level APIの策定が目的。"
        });
    });
    it("should parse 2", () => {
        const text = "[webservice][video]動画サービスのサムネイル画像を取得するサービス";
        assert.deepStrictEqual(parseComment(text), {
            tags: ["webservice", "video"],
            comment: "動画サービスのサムネイル画像を取得するサービス"
        });
    });
});
