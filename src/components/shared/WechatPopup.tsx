"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export default function WechatPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 延迟显示，让页面加载完成后再弹出
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            关注微信公众号
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 mt-4">
          <div className="w-48 h-48 flex items-center justify-center">
            <img
              src="/wechat_qrcode.webp"
              alt="微信公众号二维码"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">扫码关注微信公众号</p>
            <p className="text-sm font-medium mt-1">获取更多实用工具和教程</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
