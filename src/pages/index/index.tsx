import { View, Text, Image } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { Network } from '@/network';
import './index.css';

/**
 * 默认首页，直接覆盖本页内容
 */
const IndexPage = () => {
  useLoad(async () => {
    const res = await Network.request({ url: '/api/hello' });
    console.log(res.data);
  });

  return (
    <View className="w-full h-full flex flex-col justify-center items-center gap-1">
      <Image
        className="w-32 h-28"
        src="https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze-coding/icon/coze-coding.gif"
      />
      <View className="self-stretch flex flex-col justify-start items-start gap-2">
        <Text className="self-stretch text-center justify-start text-base-accent-foreground text-base font-bold">
          应用开发中
        </Text>
        <Text className="self-stretch text-center justify-start text-base-muted-foreground text-sm font-normal">
          请稍候，界面即将呈现
        </Text>
      </View>
    </View>
  );
};

export default IndexPage;
