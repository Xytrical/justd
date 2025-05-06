"use client"

import { Buttons } from "@/components/blocks/buttons"
import { CheckRadioBlock } from "@/components/blocks/check-radio-block"
import { LoginForm } from "@/components/blocks/login-form"
import { Menus } from "@/components/blocks/menus"
import { ModalOverlays, PopoverOverlays } from "@/components/blocks/overlays"
import { ToolbarBlock } from "@/components/blocks/toolbar-block"
import ColorPickerCombinationDemo from "@/components/docs/colors/color-picker/color-picker-combination-demo"
import SwitchDemo from "@/components/docs/controls/switch/switch-demo"
import RangeCalendarControlledDemo from "@/components/docs/date-and-time/calendar/range-calendar-controlled-demo"
import TagFieldDemo from "@/components/docs/forms/tag-field/tag-field-demo"
import ComboBoxAvatarDemo from "@/components/docs/pickers/combo-box/combo-box-avatar-demo"
import MultipleSelectDemo from "@/components/docs/pickers/multiple-select/multiple-select-demo"
import { IconArrowRight, IconPackage } from "@intentui/icons"

import { PageContainer } from "@/components/page-container"
import { buttonStyles } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Heading } from "@/components/ui/heading"
import { Link } from "@/components/ui/link"
import { Note } from "@/components/ui/note"
import { Wrapper } from "./resources"

export function Blocks() {
  return (
    <PageContainer>
      <section
        id="blocks"
        className="relative overflow-hidden rounded-2xl border bg-overlay p-0.5 pb-6 **:data-[slot=wrapper-card]:grid **:data-[slot=wrapper-card]:place-content-center sm:mb-12 sm:p-4 sm:pb-8"
      >
        <div className="absolute bottom-0 z-20 h-70 w-full bg-linear-to-t from-bg via-bg" />
        <div className="flex items-center justify-between px-4 py-1.5 sm:mb-2 sm:p-0">
          <Heading level={2} className="sm:text-lg">
            At a Glance
          </Heading>
          <Link
            href="/docs/2.x/components/buttons/button"
            className={buttonStyles({
              size: "small",
              intent: "outline",
              className: "-mr-3 sm:mr-0",
            })}
          >
            Show More <IconArrowRight />
          </Link>
        </div>
        <div className="space-y-1">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            <Wrapper>
              <TagFieldDemo />
            </Wrapper>
            <Wrapper>
              <ComboBoxAvatarDemo />
            </Wrapper>
            <Wrapper>
              <MultipleSelectDemo />
            </Wrapper>
            <LoginForm />
            <CheckRadioBlock />
            <Wrapper>
              <RangeCalendarControlledDemo />
            </Wrapper>
          </div>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-y-1 lg:gap-y-1">
              <ToolbarBlock />

              <Wrapper>
                <ColorPickerCombinationDemo />
              </Wrapper>
              <Buttons />
              <Menus />
            </div>

            <div>
              <div className="grid grid-cols-1 gap-1">
                <Wrapper className="grid gap-6 lg:px-0 lg:py-9">
                  <DateRangePicker className="w-full sm:min-w-2xs" label="Reservations date" />
                  <DatePicker className="w-full" label="Event date" />
                </Wrapper>
                <Wrapper className="p-4 py-2 sm:p-4 lg:p-5">
                  <div className="space-y-2">
                    <Note intent="danger">
                      Complete your profile to get personalized recommendations.
                    </Note>
                    <Note intent="warning">
                      Heads up! We'll be doing system maintenance this Sunday at 2 AM.
                    </Note>
                  </div>
                </Wrapper>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1">
              <PopoverOverlays />
              <Wrapper>
                <SwitchDemo />
              </Wrapper>
              <ModalOverlays />
            </div>
          </div>
        </div>

        <div className="-mt-10 relative z-30 flex items-center justify-center">
          <Link className={buttonStyles()} href="/components">
            <IconPackage /> Show More
          </Link>
        </div>
      </section>
    </PageContainer>
  )
}
