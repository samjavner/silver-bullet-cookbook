import { Button, ButtonGroup, IconName } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import "./Navtabs.scss";

export const Navtabs: React.SFC = props => (
    <>
        <div className="pz-navtabs">
            <ButtonGroup minimal={true}>{props.children}</ButtonGroup>
        </div>
        <div className="pz-navtabs__border" />
    </>
);

export interface NavtabProps {
    icon: IconName;
    isActive: boolean;
    onClick: () => void;
    text: string;
}

export const Navtab: React.SFC<NavtabProps> = props => (
    <Button
        className={classNames({
            "pz-navtabs-button": true,
            "pz-navtabs-button--active": props.isActive,
        })}
        icon={props.icon}
        onClick={props.onClick}
    >
        {props.text}
    </Button>
);
