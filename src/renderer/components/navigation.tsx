import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import * as React from "react";

export interface NavigationLayoutProps {
    navbar: NavbarProps;
    tabs: TabProps[];
    page: React.ReactNode;
}

export interface NavbarProps {
    left: NavbarLinkProps[];
    right: NavbarLinkProps[];
}

export interface NavbarLinkProps {
    isActive: boolean;
    onClick: () => void;
    text?: string;
    icon?: IconDefinition;
}

export interface TabsProps {
    tabs: TabProps[];
}

export interface TabProps {
    icon: IconDefinition;
    isActive: boolean;
    onClick: () => void;
    text: string;
}

export const NavigationLayout: React.FunctionComponent<
    NavigationLayoutProps
> = ({ navbar, tabs, page }) => (
    <div
        style={{
            height: "100vh",
            width: "100vw",
            display: "grid",
            gridTemplateRows: "auto 1fr",
        }}
    >
        <div style={{ gridRow: 1 }}>
            <Navbar {...navbar} />
        </div>
        <div style={{ gridRow: 2, overflow: "hidden" }}>
            <div
                style={{
                    height: "100%",
                    display: "grid",
                    gridTemplateRows: "auto 1fr",
                }}
            >
                <div style={{ gridRow: 1 }}>
                    <Tabs tabs={tabs} />
                </div>
                <div style={{ gridRow: 2, overflow: "hidden" }}>{page}</div>
            </div>
        </div>
    </div>
);

const Navbar: React.FunctionComponent<NavbarProps> = ({ left, right }) => (
    <nav className="navbar is-primary">
        <div className="navbar-brand">
            {left.map((props, index) => (
                <NavbarLink key={index} {...props} />
            ))}
        </div>
        <div className="navbar-menu">
            <div className="navbar-end">
                {right.map((props, index) => (
                    <NavbarLink key={index} {...props} />
                ))}
            </div>
        </div>
    </nav>
);

const NavbarLink: React.FunctionComponent<NavbarLinkProps> = ({
    isActive,
    onClick,
    text,
    icon,
}) => (
    <a
        href="#"
        className={classNames({
            "navbar-item": true,
            "is-active": isActive,
        })}
        onClick={onClick}
    >
        {icon && <FontAwesomeIcon fixedWidth={true} icon={icon} />}
        {text}
    </a>
);

const Tabs: React.FunctionComponent<TabsProps> = ({ tabs }) => (
    <div className="tabs is-centered" style={{ marginBottom: "0px" }}>
        <ul>
            {tabs.map((tab, index) => (
                <Tab key={index} {...tab} />
            ))}
        </ul>
    </div>
);

const Tab: React.FunctionComponent<TabProps> = ({
    icon,
    isActive,
    onClick,
    text,
}) => (
    <li
        className={classNames({
            "is-active": isActive,
        })}
    >
        <a href="#" onClick={onClick}>
            <span className="icon is-small">
                <FontAwesomeIcon icon={icon} />
            </span>
            {text}
        </a>
    </li>
);
