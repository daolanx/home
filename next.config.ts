import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
	images: {
		loader: "custom",
		loaderFile: "./src/lib/image-loader.ts",
		deviceSizes: [480, 640, 828, 1120, 1920],
		imageSizes: [64, 256],
	},
	experimental: {
		optimizePackageImports: ["motion/react", "lucide-react"],
	},
};

export default withNextIntl(nextConfig);

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
