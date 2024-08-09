import AddMember from '@/app/(home)/member/addMember'
import RemoveMember from '@/app/(home)/member/removeMember'
import { queryMember } from '@/app/actions'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'

export default async function Member() {
  const members = await queryMember()
  return (
    <div>
      <div className="flex justify-between">
        <Heading>Member</Heading>
        <AddMember />
      </div>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Email</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((email) => (
            <TableRow key={email}>
              <TableCell>{email}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <RemoveMember email={email} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
