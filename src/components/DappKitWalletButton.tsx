"use client";

import { useDappKit } from "@/hooks/useDappKit";
import { Button, Menu, MenuButton, MenuList, MenuItem, HStack, Text, VStack, Spinner } from "@chakra-ui/react";

export function DappKitWalletButton() {
  const { account, isConnected, isConnecting, connect, disconnect, balance } = useDappKit();

  console.log("🔵 Button render:", { isConnected, address: account?.address, isConnecting });

  if (isConnecting) {
    return (
      <Button
        bgGradient="linear(to-r, purple.400, blue.500)"
        color="white"
        fontWeight="600"
        px={6}
        py={3}
        rounded="xl"
        isDisabled
      >
        <Spinner size="sm" mr={2} />
        Connecting...
      </Button>
    );
  }

  if (!isConnected) {
    return (
      <Button
        onClick={() => {
          console.log("🟢 Button clicked!");
          connect();
        }}
        bgGradient="linear(to-r, purple.400, blue.500)"
        color="white"
        fontWeight="600"
        px={6}
        py={3}
        rounded="xl"
        _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
        _active={{ transform: "translateY(0)" }}
        transition="all 0.2s"
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        bgGradient="linear(to-r, purple.400, blue.500)"
        color="white"
        fontWeight="600"
        px={6}
        py={3}
        rounded="xl"
        _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
      >
        <HStack spacing={3}>
          <VStack align="end" spacing={0}>
            <Text fontSize="xs" opacity={0.8}>{balance} ETH</Text>
            <Text fontSize="sm" fontFamily="mono">
              {account?.address?.slice(0, 6)}...{account?.address?.slice(-4)}
            </Text>
          </VStack>
        </HStack>
      </MenuButton>
      <MenuList bg="white" borderColor="gray.200">
        <MenuItem
          onClick={() => {
            if (account?.address) {
              navigator.clipboard.writeText(account.address);
            }
          }}
        >
          📋 Copy Address
        </MenuItem>
        <MenuItem
          as="a"
          href={`https://robinhoodchain.blockscout.com/address/${account?.address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          🔍 View on Explorer
        </MenuItem>
        <MenuItem onClick={() => { disconnect(); }} color="red.500">
          🚪 Disconnect
        </MenuItem>
      </MenuList>
    </Menu>
  );
}