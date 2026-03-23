import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="homepage-cta py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-card border border-border overflow-hidden homepage-card-glow">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-(--homepage-glow) rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-(--homepage-glow) rounded-full blur-[80px] opacity-50" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              准备好提升你的面试能力了吗？
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              开始与 AI 面试官对话，获取专业的面试指导和建议
            </p>
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-medium homepage-btn-glow"
            >
              <Link href="/chat">
                立即开始
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
