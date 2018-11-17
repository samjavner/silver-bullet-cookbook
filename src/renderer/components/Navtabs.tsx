import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import * as React from "react";

export const Navtabs: React.SFC = props => (
    <div className="tabs is-centered" style={{ marginBottom: "0px" }}>
        <ul>{props.children}</ul>
    </div>
);

export interface NavtabProps {
    icon: IconDefinition;
    isActive: boolean;
    onClick: () => void;
    text: string;
}

export const Navtab: React.SFC<NavtabProps> = props => (
    <li
        className={classNames({
            "is-active": props.isActive,
        })}
    >
        <a href="#" onClick={props.onClick}>
            <span className="icon is-small">
                <FontAwesomeIcon icon={props.icon} />
            </span>
            {props.text}
        </a>
    </li>
);
