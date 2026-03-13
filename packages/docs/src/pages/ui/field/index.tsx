import { View } from "@tarojs/components"
import { useState } from "react"

import { PageLayout } from "@/biz/page-layout"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

function FieldDemo() {
  const [sameAsShipping, setSameAsShipping] = useState(true)

  return (
    <View className="w-full max-w-md">
      <View className="space-y-4">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>All transactions are secure and encrypted</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel for="checkout-7j9-card-name-43j">Name on Card</FieldLabel>
                <Input id="checkout-7j9-card-name-43j" placeholder="Evil Rabbit" />
              </Field>
              <Field>
                <FieldLabel for="checkout-7j9-card-number-uw1">Card Number</FieldLabel>
                <Input id="checkout-7j9-card-number-uw1" placeholder="1234 5678 9012 3456" />
                <FieldDescription>Enter your 16-digit card number</FieldDescription>
              </Field>
              <View className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Month</FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="01">01</SelectItem>
                        <SelectItem value="02">02</SelectItem>
                        <SelectItem value="03">03</SelectItem>
                        <SelectItem value="04">04</SelectItem>
                        <SelectItem value="05">05</SelectItem>
                        <SelectItem value="06">06</SelectItem>
                        <SelectItem value="07">07</SelectItem>
                        <SelectItem value="08">08</SelectItem>
                        <SelectItem value="09">09</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="11">11</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Year</FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                        <SelectItem value="2029">2029</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel for="checkout-7j9-cvv">CVV</FieldLabel>
                  <Input id="checkout-7j9-cvv" placeholder="123" />
                </Field>
              </View>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="checkout-7j9-same-as-shipping-wgm"
                  checked={sameAsShipping}
                  onCheckedChange={setSameAsShipping}
                />
                <FieldLabel
                  className="font-normal"
                  onClick={() => setSameAsShipping((v) => !v)}
                >
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel for="checkout-7j9-optional-comments">Comments</FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button>Submit</Button>
            <Button variant="outline">Cancel</Button>
          </Field>
        </FieldGroup>
      </View>
    </View>
  )
}

export default function FieldPage() {
  return (
    <PageLayout title="Field">
      <FieldDemo />
    </PageLayout>
  )
}

