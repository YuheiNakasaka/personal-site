import { act } from "@testing-library/react"
import { useGetBalance, UseGetBalanceType } from "./useGetBalance"

describe("useGetBalance", () => {
  beforeEach(() => {})

  test("return valid response if success", async () => {
    const getBalance = useGetBalance()
    const mockObject: UseGetBalanceType = {
      balance: 1.0,
    }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json() {
          return mockObject
        },
      })
    ) as any

    await act(async () => {
      const data: UseGetBalanceType = await getBalance("0xaaa", "eth")
      expect(data.balance).toBe(mockObject.balance)
    })
  })

  test("return 0.0 if invalid args", async () => {
    const getBalance = useGetBalance()
    const mockObject: UseGetBalanceType = {
      balance: 0.0,
    }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json() {
          return mockObject
        },
      })
    ) as any

    const data: UseGetBalanceType = await getBalance("", "eth")
    expect(data.balance).toBe(mockObject.balance)
  })
})
