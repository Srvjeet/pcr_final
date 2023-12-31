import React from "react"
import { Button, Divider, Menu, Typography } from "antd"
import {
  SolutionOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons"
import { withRouter, useLocation } from "react-router-dom"
import styled from "styled-components"
import * as Commons from "common/common"

const StyledMenu = styled(Menu)`
  border: none;
`

const StyledMenuGroup = styled(Menu.ItemGroup)`
  .ant-menu-item-group-title {
    color: #bfbfbf;
  }
`

const Sidebar = (props) => {
  const { history, isHamburger, isCollapsed, collapseToggle } = props
  const location = useLocation()
  const { Text } = Typography

  const getCurrentPathWithoutLastPart = () => {
    return location.pathname.slice(0, location.pathname.lastIndexOf("/")) !== ""
      ? location.pathname.slice(0, location.pathname.lastIndexOf("/") + 1)
      : location.pathname
  }

  const handleClick = (event) => {
    switch (event.key) {
      case Commons.adminOccasionsRoute:
        history.push(Commons.adminOccasionsRoute)
        break
      case "collapse":
        collapseToggle()
        break
      default:
        break
    }

    if (isHamburger) collapseToggle()
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ overflowX: "hidden", overflowY: "auto" }}
    >
      <div className="flex mt-4 mx-4">
        <img
          src="/logo.png"
          alt=""
          className="mx-auto"
          style={{ maxHeight: "80px" }}
        />
      </div>
      <div className="relative flex text-center px-1">
        <Text style={{ fontSize: 16, marginTop: 20 }} className="mx-auto whitespace-pre-wrap">
          {process.env.REACT_APP_SYSTEM_NAME}
        </Text>
      </div>
      <Divider />
      <div className="flex-grow flex-shrink">
        <StyledMenu
          onClick={handleClick}
          selectedKeys={[getCurrentPathWithoutLastPart()]}
          mode="inline"
        >
          <StyledMenuGroup>
            <Menu.Item
              key={Commons.adminOccasionsRoute}
              icon={
                <SolutionOutlined
                  style={{
                    marginRight: 5,
                    fontSize: 22,
                  }}
                />
              }
            >
              予約管理
            </Menu.Item>
          </StyledMenuGroup>
        </StyledMenu>
        <div>
            <div onClick={()=>history.replace('/sys/eventsurvey')}
              style={{
                color: '#6fa8dc',
                marginLeft: 14,
                top: 15,
                fontSize: 15,
                padding: 10,
                border: 'none',
                cursor: 'pointer',
                position: 'relative',

              }}
            >
              📮<span style={{ marginLeft: '12px' }}>Manage Events</span>
            </div>
          </div>

      {/* ++++++++++++++++++++++++++   AddForm Control added  +++++++++++++++++++++++++++++++ */}
          <div>
            <div onClick={()=>history.replace('/sys/AddForm')}
              style={{
                color: '#6fa8dc',
                marginLeft: 14,
                top: 15,
                fontSize: 15,
                padding: 10,
                border: 'none',
                cursor: 'pointer',
                position: 'relative',

              }}
            >
              📮<span style={{ marginLeft: '12px' }}>Add Form</span>
            </div>
          </div>
          
      {/* ++++++++++++++++++++++++++   AddForm Control added ends here +++++++++++++++++++++++++++++++ */}

      {/* ++++++++++++++++++++++++++   Mail blast Control added  +++++++++++++++++++++++++++++++ */}
      <div>
            <div onClick={()=>history.replace('/sys/Mailblast')}
              style={{
                color: '#6fa8dc',
                marginLeft: 14,
                top: 15,
                fontSize: 15,
                padding: 10,
                border: 'none',
                cursor: 'pointer',
                position: 'relative',

              }}
            >
              📮<span style={{ marginLeft: '12px' }}>Mail Blast</span>
            </div>
          </div>
          
      {/* ++++++++++++++++++++++++++   Mailblast Control added ends here +++++++++++++++++++++++++++++++ */}

      </div>
      <Button className="p-0" onClick={collapseToggle}>
        {isCollapsed ? (
          <MenuUnfoldOutlined
            style={{
              fontSize: 22,
            }}
          />
        ) : (
          <MenuFoldOutlined
            style={{
              fontSize: 22,
            }}
          />
        )}
      </Button>
    </div>
  )
}

export default withRouter(Sidebar)
