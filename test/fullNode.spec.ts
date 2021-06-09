import * as nock from "nock";
import { FullNode } from "../index";

describe("Full Node", () => {
  describe("RPC calls", () => {
    const fullNode = new FullNode({net: "testnet_7"});

    it("calls get_blockchain_state", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_blockchain_state")
        .reply(200, "success");

      expect(await fullNode.getBlockchainState()).toEqual("success");
    });

    it("calls get_block with header_hash in body", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_block", { header_hash: "fakeHeaderHash" })
        .reply(200, "success");

      expect(await fullNode.getBlock("fakeHeaderHash")).toEqual("success");
    });

    it("calls get_block_record_by_height with height in body", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_block_record_by_height", { height: 42 })
        .reply(200, "success");

      expect(await fullNode.getBlockRecordByHeight(42)).toEqual("success");
    });

    it("calls get_blocks with start and end in body", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_blocks", {start: 0, end: 10, exclude_header_hash: false })
        .reply(200, "success");

      expect(await fullNode.getBlocks(0, 10)).toEqual("success");
    });

    it("calls get_block_record with header_hash in body", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_block_record", { header_hash: "fakeHeaderHash"})
        .reply(200, "success");
      
      expect(await fullNode.getBlockRecord("fakeHeaderHash")).toEqual("success");
    });

    it("calls get_network_space with newer_block_header_hash and older_block_header_hash in body", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_network_space", {newer_block_header_hash: "newerBlockHeaderHash", older_block_header_hash: "olderBlockHeaderHash"})
        .reply(200, "success");

      expect(await fullNode.getNetworkSpace("newerBlockHeaderHash", "olderBlockHeaderHash")).toEqual(
        "success"
      );
    });

    it("calls get_initial_freeze_period", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*"})
        .post("/get_initial_freeze_period")
        .reply(200, "success");

      expect(await fullNode.getInitialFreezePeriod()).toEqual("success");
    })
    
    it("calls get_network_info", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*"})
        .post("/get_network_info")
        .reply(200, "success");

      expect(await fullNode.getNetworkInfo()).toEqual("success");
    })

    it("calls get_unfinished_block_headers with header_hash in body", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_unfinished_block_headers", { height: 42 })
        .reply(200, "success");

      expect(await fullNode.getUnfinishedBlockHeaders(42)).toEqual("success");
    });

    it("calls get_coin_records_by_puzzle_hash with puzzle_hash", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_coin_records_by_puzzle_hash", {
          puzzle_hash: "fakePuzzleHash",
          include_spent_coins: false,
        })
        .reply(200, "success");

      expect(await fullNode.getUnspentCoins("fakePuzzleHash")).toEqual(
        "success"
      );
    });

    it("calls get_coin_record_by_name with name", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_coin_record_by_name", {
          name: "fakeCoinName",
        })
        .reply(200, "success");

      expect(await fullNode.getCoinRecordByName("fakeCoinName")).toEqual(
        "success"
      );
    });

    it("calls get_additions_and_removals", async () => {
      nock("https://localhost:8555")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_additions_and_removals", { header_hash: "fakeHeaderHash" })
        .reply(200, "success");

      expect(await fullNode.getAdditionsAndRemovals("fakeHeaderHash")).toEqual(
        "success"
      );
    });
  });
});
