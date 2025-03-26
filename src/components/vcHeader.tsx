import { VcText } from "./vcText";
interface Iprogs {
    title: string
}
const VcHeader = ({ title }: Iprogs) => {
    return (
        <VcText type="header" style={{ paddingVertical: 10 }} text={title} />
    );
}
export default VcHeader;