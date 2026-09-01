"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useColorMode,
  useDisclosure,
  VStack,
  Badge,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaRegMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
// import { useOneChainWallet } from "@/hooks/useOneChainWallet";  // 👈 注释掉
// import { OneChainWalletButton } from "./OneChainWallet";       // 👈 注释掉

export function SideMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();
  // const { 
  //   isConnected, 
  //   account, 
  //   disconnect 
  // } = useOneChainWallet();  // 👈 注释掉

  return (
    <>
      <Button
        display={{ lg: "none", base: "block" }}
        ref={btnRef}
        onClick={onOpen}
      >
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Button height="56px" w="56px" onClick={toggleColorMode} mr="10px">
              {colorMode === "light" ? <FaRegMoon /> : <IoSunny />}
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {/* OneChainWalletButton 已移除 */}
              <Box>
                {/* <OneChainWalletButton /> */}  {/* 👈 注释掉 */}
              </Box>

              {/* 钱包连接状态显示已移除 */}

              <Link href="/landing" _hover={{ textDecoration: "none" }} onClick={onClose}>
                <Button variant="ghost" w="full" justifyContent="flex-start">
                  About
                </Button>
              </Link>
              
              <Link href="/dashboard" _hover={{ textDecoration: "none" }} onClick={onClose}>
                <Button variant="ghost" w="full" justifyContent="flex-start">
                  Dashboard
                </Button>
              </Link>
              
              <Link href="/collection" _hover={{ textDecoration: "none" }} onClick={onClose}>
                <Button variant="ghost" w="full" justifyContent="flex-start">
                  Marketplace
                </Button>
              </Link>
              
              {/* Profile 链接已移除，因为需要钱包连接状态 */}
              {/* 
              <Link href="/profile" _hover={{ textDecoration: "none" }} onClick={onClose}>
                <Button variant="ghost" w="full" justifyContent="flex-start">
                  Profile
                </Button>
              </Link>
              */}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            {/* Disconnect 按钮已移除 */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}