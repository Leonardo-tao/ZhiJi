"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="homepage-hero relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 homepage-grid-bg mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 homepage-radial-gradient" />

      {/* Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-(--homepage-glow) rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            AI 驱动的面试助手
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
          知己: 你的 AI{" "}
          <span className="homepage-gradient-text">智能面试官</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          专为前端开发者打造，提供简历优化、模拟面试、面试题解答等全方位服务，助你轻松斩获心仪
          Offer
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-12 px-6 text-base font-medium homepage-btn-glow"
          >
            <Link href="/chat">
              开始对话
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base font-medium"
          >
            <Link href="#features">了解更多</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-foreground">
              10K+
            </div>
            <div className="text-sm text-muted-foreground mt-1">面试问题</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-foreground">
              5K+
            </div>
            <div className="text-sm text-muted-foreground mt-1">用户信赖</div>
          </div>
          <div className="text-center col-span-2 sm:col-span-1">
            <div className="text-3xl sm:text-4xl font-bold text-foreground">
              95%
            </div>
            <div className="text-sm text-muted-foreground mt-1">满意度</div>
          </div>
        </div>
      </div>
    </section>
  );
}
