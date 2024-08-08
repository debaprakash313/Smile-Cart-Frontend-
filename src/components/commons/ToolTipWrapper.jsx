import { Tooltip } from "@bigbinary/neetoui";

const ToolTipWrapper = ({ showToolTip, children, ...tooltipProps }) => {
  if (!showToolTip) return children;

  return (
    <Tooltip {...tooltipProps}>
      <div>{children}</div>
    </Tooltip>
  );
};

export default ToolTipWrapper;
