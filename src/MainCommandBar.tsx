import * as React from "react";
import {
  CommandBar,
  ICommandBarItemProps,
} from "@fluentui/react/lib/CommandBar";
import { IButtonStyles, IconButton } from "@fluentui/react/lib/Button";
import { useBoolean, useId } from "@fluentui/react-hooks";
import { ContextualMenu, FontWeights, IDragOptions, IIconProps, mergeStyleSets, Modal } from "@fluentui/react";
import { Settings } from "./Settings";
import { myTheme } from "./util/themes";

export const MainCommandBar: React.FunctionComponent = () => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const [isDraggable] = useBoolean(false);
  const [keepInBounds] = useBoolean(false);
  const dragOptions = React.useMemo(
    (): IDragOptions => ({
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu,
      keepInBounds,
    }),
    [keepInBounds],
  );

  const _farItems: ICommandBarItemProps[] = [
    {
      key: "info",
      text: "Seiteneinstellungen",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Seiteneinstellungen",
      iconOnly: true,
      iconProps: { iconName: "Settings", style: {color: "white"} },
      onClick: (ev, item) => {
        console.log("Seiteneinstellungen!!!");
        showModal()
      },
    },
  ];
  const titleId = useId('title');

  return (
    <>
      <CommandBar
        items={[]}
        farItems={_farItems}
        styles={{root: {backgroundColor: "#0"}}}
      />
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
        containerClassName={contentStyles.container}
        dragOptions={isDraggable ? dragOptions : undefined}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>YAHOOOOOOOOOOOOOOOOOOOOOOOO</span>
      {/* X icon is fucked */}
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={hideModal}
          />
        </div>
        <div className={contentStyles.body}>
            <Settings/>
        </div>
      </Modal>
    </>
  );
};

const cancelIcon: IIconProps = { iconName: 'Cancel', theme: myTheme };

const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    color: "transparent",
  },
  header: [
    // // eslint-disable-next-line deprecation/deprecation
    myTheme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${myTheme.palette.themePrimary}`,
      color: myTheme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: myTheme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: myTheme.palette.neutralDark,
  },
};
